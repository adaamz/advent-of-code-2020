export type PasswordPolicy = {
    letter: string;
    letterPositions: number[];
};

export type PasswordWithPolicy = {
    password: string;
    policy: PasswordPolicy;
};
