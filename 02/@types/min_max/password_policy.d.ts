export type Quantifier = {
    min: number;
    max: number;
};

export type PasswordPolicy = {
    letter: string;
    quantifier: Quantifier;
};

export type PasswordWithPolicy = {
    password: string;
    policy: PasswordPolicy;
};
