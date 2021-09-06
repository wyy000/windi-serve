// const memoryStorage = {...Array.from({length: 10 * 10000}).map((_, i) => ({[i]: Math.random()}))}
const memoryStorage = {
  '1001': { name: '良品铺子' },
  '1002': { name: '来伊份' },
  '1003': { name: '三只松鼠' },
  '1004': { name: '百草味' },
}

async function delay (ms = 200) {
  await new Promise((r) => setTimeout(r, ms))
}

class ShopService {
  async init () {
    await delay()
  }

  async create (values) {
    await delay()

    const id = String(1 + Object.keys(memoryStorage).reduce((m, id)  => Math.max(m, id), -Infinity))

    return {id, ...(memoryStorage[id] = Object.assign({}, values))}
  }

  async find ({id, pageNum = 1, pageSize = 20}) {
    await delay()

    if (id) return memoryStorage[id]
    else {
      return Object.keys(memoryStorage)
        .slice((Number(pageNum) - 1) * pageSize, pageNum * pageSize)
        .map(id => ({id, ...memoryStorage[id]}))
    }
  }

  async modify ({id, ...values}) {
    await delay()

    const target = memoryStorage[id]
    if (!target) return null
    else {
      return Object.assign(target, {id, ...values})
    }
  }

  async delete ({id}) {
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