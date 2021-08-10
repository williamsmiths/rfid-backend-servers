const isValidObjectId = id => (id.match(/^[0-9a-fA-F]{24}$/) ? id : null)

export { isValidObjectId }
