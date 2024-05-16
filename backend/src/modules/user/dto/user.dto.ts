enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
}

export interface UserDto {
	id: number;
	role: UserRole;
}

export interface CreateUserDto {
	username: string;
    ip: string;
	role: UserRole;
}