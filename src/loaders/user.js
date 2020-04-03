export const batchUsers = async (keys, models) => {
  const users = await models.Users.findAll({
    where: {
      id: {
        $in: keys,
      },
    },
  });
  // console.log(keys, users)
  return keys.map(key => users.find(user => user.id === key));
};
