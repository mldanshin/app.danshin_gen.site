import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const VERIFY_USER_URL = process.env.NEXT_PUBLIC_VERIFY_USER_URL;

export function generateAccessToken(userData) {
  return jwt.sign(
    { 
      sub: userData.sub,
      uuid: userData.uuid,
      roles: userData.roles
    },
    JWT_SECRET,
    { expiresIn: '60m' }
  );
}

export function generateRefreshToken(userData) {
  return jwt.sign(
    { 
      sub: userData.sub,
      uuid: userData.uuid,
      roles: userData.roles
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyAccessToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export function verifyRefreshToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function verifyUser(token) {
  try {
    const response = await fetch(VERIFY_USER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    });

    if (response.ok) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}

function decodeToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function getUserDataFromToken(token) {
  const decoded = decodeToken(token);
  return {
    sub: decoded?.sub || null,
    uuid: decoded?.uuid || null,
    roles: decoded?.roles || null
  };
}
