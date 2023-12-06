import * as bcryptjs from 'bcryptjs';

export async function hashPassword(rawPassword: string): Promise<string> {
    const salt = await bcryptjs.genSalt(14);
    const hash = await bcryptjs.hash(rawPassword, salt);
    
    return hash;
};

export async function comparePassword(rawPassword: string, hashPassword: string): Promise<boolean> {
    const validation = await bcryptjs.compare(rawPassword, hashPassword);

    return validation;
};
