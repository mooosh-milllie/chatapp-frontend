import * as Yup from 'yup';


export const addFriendSchema = Yup.object({
  username: Yup.string()
    .required("A username is required!")
    .min(6, "Username too short!")
    .max(28, "Username too long!")
})
export const createGroupSchema = Yup.object({
  groupname: Yup.string()
    .required("A username is required!")
    .min(6, "Group name minimum of 6 chars!")
    .max(28, "Group name maximum of 28 chars!!")
})

export const loginSchema = Yup.object({
  username: Yup.string()
    .required("Username required!")
    .min(6, "Username too short!")
    .max(28, "Username too long!"),
  password: Yup.string()
    .required("Password required!")
    .min(6, "Password too short!")
    .max(28, "Password too long!"),
})

export const signUpSchema = Yup.object({
  username: Yup.string()
    .required("Username required!")
    .min(6, "Username too short!")
    .max(28, "Username too long!"),
  password: Yup.string()
    .required("Password required!")
    .min(6, "Password too short!")
    .max(28, "Password too long!"),
})