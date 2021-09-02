const memoryStorage = {...Array.from({length: 10 * 10000}).map((_, i) => ({[i]: Math.random()}))}

async function delay (ms = 200) {
  await new Promise((r) => setTimeout(r, ms))
}

class ShopService {
  async init () {
    await delay()
  }

  async find ({id, pageNum = 1, pageSize = 20}) {
    await delay()

    if (id) return memoryStorage[id]
    else {
      return Object.keys(memoryStorage)
        .slice(pageNum * pageSize, (pageNum + 1) * pageSize)
        .map(id => ({id, ...memoryStorage[id]}))
    }
  }

  async modify ({id, ...values}) {
    await delay()

    const target = memoryStorage[id]
    if (!target) return null
    else {
      return Object.assign(target, ...values)
    }
  }

  async remove ({id}) {
    await delay()

    const target = memoryStorage[id]
    if (!target) return false
    else {
      return delete memoryStorage[id]
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