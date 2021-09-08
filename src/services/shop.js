const {Shop} = require('../models')

class ShopService {
  async init () {}

  async create (values) {
    return await Shop.create(values)
  }

  async find ({id, pageNum = 1, pageSize = 20}) {
    if (id) return [await Shop.findByPk(id)]
    else {
      return await Shop.findAll({
        offset: pageNum * pageSize,
        limit: pageSize,
      })
    }
  }

  async modify ({id, ...values}) {
    const target = await Shop.findByPk(id)
    if (!target) return null
    else {
      Object.assign(target, {id, ...values})
      return await target.save()
    }
  }

  async delete ({id}) {
    const target = await Shop.findByPk(id)
    if (!target) return false
    else {
      return target.destroy()
    }
  }
}

let service
module.exports = async function () {
  if (!service) {
    service = new ShopService()
    await service.init()
  }

  return service
}