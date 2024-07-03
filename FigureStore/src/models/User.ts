interface UserRequest {
    firstName: string,
    lastName: string,
    phoneNumber: string,
}

interface ChangePasswordRequest {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}

interface UserAddress {
    id: string,
    address: string,
    district: string,
    province: string
}