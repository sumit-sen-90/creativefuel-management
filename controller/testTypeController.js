const constant = require("../common/constant");
const response = require("../config/response");
const { Validator } = require("node-input-validator");
const helper = require("../helper/hlp_common");
const testType = require("../model/testType");

//------------------------------------------CREATE THE TEST TYPE INFORMATION

exports.createTestType = async (req, res) => {
  let postData = req.body;
  try {
    let validate = new Validator(postData, {
      test_type: "required",
    });
    let matched = await validate.check();
    if (!matched) {
      return response.returnFalse(
        req,
        res,
        helper.validationErrorConvertor(validate),
        {}
      );
    }
    let testTypeData = await testType.findOne({
      test_type: postData.test_type.trim(),
    });
    if (testTypeData) {
      return response.returnFalse(
        req,
        res,
        constant.TEST_TYPE_ALREADY_EXISTS,
        {}
      );
    }
    let typeInfo = new testType(postData);
    let data = await typeInfo.save();
    if (data) {
      return response.returnTrue(req, res, constant.CREATION_SUCCESS, data);
    } else {
      return response.returnFalse(req, res, constant.OOPS_TRY_AGAIN, {});
    }
  } catch (error) {
    console.log(error);
    return response.returnFalse(req, res, constant.INTERNAL_ERROR, {});
  }
};

//------------------------------------------LIST THE TEST TYPE INFORMATION

exports.listTestType = async (req, res) => {
  try {
    let data = await testType.find();
    if (data) {
      return response.returnTrue(req, res, constant.SUCCESS, data);
    } else {
      return response.returnFalse(req, res, constant.NO_RECORD, {});
    }
  } catch (error) {
    console.log(error);
    return response.returnFalse(req, res, constant.INTERNAL_ERROR, {});
  }
};
