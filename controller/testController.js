const { Validator } = require("node-input-validator");
const response = require("../config/response");
const helper = require("../helper/hlp_common");
const constant = require("../common/constant");
const users = require("../model/users");

//------------------------------------------CREATE THE TEST INFORMATION

exports.createTest = async (req, res) => {
  const postData = req.body;
  
  try {
    //Validate the request body data
    let validation = new Validator(postData, {
      test_name: "required",
      tester_mobile_no: "required",
      tester_alternative_no: "required",
      tester_email: "required|email",
      test_type: "required",
    });
    let matched = await validation.check();
    if (!matched) {
      return response.returnFalse(
        req,
        res,
        helper.validationErrorConvertor(validation),
        {}
      );
    }

    //Check if email is already exists or not
    const userData = await users.findOne({ tester_email: postData.tester_email });
    if (userData) {
      return response.returnFalse(req, res, constant.EMAIL_ALREADY_EXISTS, {});
    }

    const userInfo = new users(postData);
    const savedUser = await userInfo.save();
    if (savedUser) {
      return response.returnTrue(
        req,
        res,
        constant.TEST_CREATE_SUCCESS,
        savedUser
      );
    } else {
      return response.returnFalse(req, res, constant.OOPS_TRY_AGAIN, {});
    }
  } catch (error) {
    console.error("Error signup:", error);
    return response.returnFalse(req, res, constant.INTERNAL_ERROR, {});
  }
};

//------------------------------------------GET ALL TEST INFORMATION

exports.getAllTest = async (req, res) => {
  
  try {
    const pipeline = [
      {
        $lookup: {
          from: 'test_types', 
          localField: 'test_type', 
          foreignField: '_id', 
          as: 'testTypeDetails', 
        },
      },
      {
        $unwind: '$testTypeDetails',
      },
  
    ];
    const testData = await users.aggregate(pipeline);
  
    if (testData.length > 0) {
      return response.returnTrue(req, res, constant.FETCHING_SUCCESS, testData);
    } else {
      return response.returnTrue(req, res, constant.NO_RECORD, {});
    }
  } catch (error) {
    console.error("Error list test:", error);
    return response.returnFalse(req, res, constant.INTERNAL_ERROR, {});
  }
};

//------------------------------------------Get THE TEST INFORMATION USING ID

exports.getTest = async (req, res) => {
  
  
  try {
    const testData = await users.findById(req.params.id);
    if (testData) {
      return response.returnTrue(req, res, constant.FETCHING_SUCCESS, testData);
    } else {
      return response.returnTrue(req, res, constant.NO_RECORD, {});
    }
  } catch (error) {
    console.error("Error list test:", error);
    return response.returnFalse(req, res, constant.INTERNAL_ERROR, {});
  }
};

//------------------------------------------UPDATE THE TEST INFORMATION

exports.updateTest = async (req, res) => {
  try {
    let id = req.params.id
    req.body.updatedAt = Date.now()
    await users.updateOne({ _id: id }, { $set: req.body });
    return response.returnTrue(req, res, constant.UPDATE_SUCCESS, {});
  } catch (error) {
    console.error("Error updating test:", error);
    return response.returnFalse(req, res, constant.INTERNAL_ERROR, {});
  }
};

//------------------------------------------DELTE THE TEST FROM DB ( HARD DELETE )

exports.deleteTest = async (req, res) => {
  try {
    await users.findByIdAndDelete(req.params.id);
    return response.returnTrue(req, res, constant.DELETION_SUCCESS);
  } catch (error) {
    console.error("Error Delete test:", error);
    return response.returnFalse(req, res, constant.INTERNAL_ERROR, {});
  }
};