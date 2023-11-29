export const getUsersByIds = (userIds) => {
    return userIds.map(ui => { return { name: "Solyana", id: ui } })
}

export const getUserById = (userId) => {
    return getUsersByIds([userId])[0]
}
