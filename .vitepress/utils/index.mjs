export const transformSideBars = (articles) => {
  const result = {}
  for (const article of articles) {
    const {
      name,
      pathPrefix,
      items
    } = article
    result[pathPrefix] = [{
      text: name,
      items: items.map(item => ({
        text: item,
        link: `/${pathPrefix}/${item}`
      }))
    }]
  }
  return result
}

export const transformArticleNav = (articles) => {
  const result = []
  articles.forEach(article => {
    const {
      name,
      pathPrefix,
      items,
      filter
    } = article
    result.push({
      text: name,
      link: `/${pathPrefix}/${items[0]}`,
      filter
    })
  })
  return result
}
