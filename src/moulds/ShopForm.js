const Yup = require('yup')

exports.createShopFormSchema = () => Yup.object({
  name: Yup.string()
    .required('名称不能为空')
    .min(3, '名称至少3个字符')
    .max(20, '名称不可超过20个字符')
})