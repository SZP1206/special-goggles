/**
 * 评论模块
 */
import request from '@/utils/request'

/**
 *
 * @param {a | c} type 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @param {*} source 源id，文章id或评论id
 * @param {*} offset 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * @param {*} limit 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 */
export const getComment = (type, source, offset, limit) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params: {
      type,
      source,
      offset,
      limit,
    },
  })
}

/**
 *
 * @param {int} target 点赞的评论id
 */
export const likeComment = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target,
    },
  })
}

/**
 *
 * @param {int} target 要取消点赞的评论id或评论回复id
 */
export const unlikeComment = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`,
  })
}

/**
 *
 * @param {Integer} target 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * @param {String} content 评论内容
 * @param {*} art_id 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 */
export const postReply = (target, content, artId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data: {
      target,
      content,
      art_id: artId,
    },
  })
}
