import { logger } from '../utils/logger.js'

export const prueba = async (req, res) => {
  try{   
    logger.silly('log silly'),
    logger.debug('log debug'),
    logger.verbose('log verbose'),
    logger.info('log info'),
    logger.http('log http'),
    logger.warn('log warn'),
    logger.error('log error'),
    res.json({ message: 'Logs were successfully created' })
  }catch (error) {
        throw new Error(error);
    }
}

