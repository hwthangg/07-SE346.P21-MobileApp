  
  import jwt from 'jsonwebtoken';
  // Helper function to generate JWT token
  export const generateToken = (account) => {
    return jwt.sign(
      {
        id: account._id,
        role: account.role,
        status: account.status
      },
      '12345@12345@12345',
      { expiresIn: '7d' }
    );
  };

  export const verifyToken = (token) => {
    return jwt.verify(token, '12345@12345@12345');
  };