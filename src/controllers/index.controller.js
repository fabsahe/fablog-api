import indexService from '../services/index.service.js'

const index = (req, res) => {
  const message = indexService.index()
  res.send({ status: 'OK', data: message })
}

const ping = async (req, res) => {
  const result = await indexService.ping()
  res.send({ status: 'OK', data: result })
}

export default { index, ping }
