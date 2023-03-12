import service from '../../services/log.js'

export default (req, res, next) => {
    service.entry(`HTTP req: ${req.method} @ ${req.originalUrl}`, null, {
        ip: req.ip,
        headers: req.headers,
        body: req.body
    })
    next()
}