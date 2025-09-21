// Configurações de ambiente
module.exports = {
    // Configurações do Banco de Dados
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'atendefacil',
    
    // Configurações do Google OAuth
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '1096436678713-og0v7cellqpl1ec5d1d63kr98jule12j.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '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',
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
    
    // Configurações da Sessão
    SESSION_SECRET: process.env.SESSION_SECRET || 'nosso_secret'
}
