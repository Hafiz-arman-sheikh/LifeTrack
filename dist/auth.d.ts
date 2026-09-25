interface User {
    name: string;
    email: string;
    password: string;
}
declare function getUsers(): User[];
declare function saveUsers(users: User[]): void;
declare function loginUser(event: SubmitEvent): void;
declare function signupUser(event: SubmitEvent): void;
declare function googleLogin(): void;
declare function forgotPassword(event: MouseEvent): void;
declare function showSignup(): void;
declare function showLogin(): void;
declare function togglePassword(inputId: string, button: HTMLButtonElement): void;
declare function showToast(message: string): void;
declare function continueAsGuest(): void;
//# sourceMappingURL=auth.d.ts.map