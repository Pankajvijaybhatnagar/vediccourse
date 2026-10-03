// Maps backend error codes (see backend ApiError codes) to friendly bilingual messages.
// Returns a { en, hi } object, so callers render it with t().

const firstNumber = (s) => Number(String(s || '').match(/\d+/)?.[0]) || null;

export function authErrorMessage(err) {
  if (!err) return null;
  const code = err.code;

  if (err.status === 0 || code === 'NETWORK_ERROR') {
    return { en: 'Could not reach the server. Check your connection and try again.', hi: 'सर्वर से संपर्क नहीं हो सका। अपना इंटरनेट जाँचें और पुनः प्रयास करें।' };
  }

  switch (code) {
    case 'OTP_INVALID': {
      const left = err.details?.attemptsLeft;
      return left > 0
        ? { en: `Incorrect OTP. ${left} attempt${left === 1 ? '' : 's'} left.`, hi: `गलत OTP। ${left} प्रयास शेष।` }
        : { en: 'Incorrect OTP.', hi: 'गलत OTP।' };
    }
    case 'OTP_EXPIRED':
      return { en: 'This OTP has expired. Please request a new one.', hi: 'यह OTP समाप्त हो गया है। कृपया नया OTP मँगाएँ।' };
    case 'OTP_COOLDOWN': {
      const s = firstNumber(err.message);
      return s
        ? { en: `Please wait ${s}s before requesting another OTP.`, hi: `नया OTP मँगाने से पहले ${s} सेकंड प्रतीक्षा करें।` }
        : { en: 'Please wait a moment before requesting another OTP.', hi: 'नया OTP मँगाने से पहले थोड़ी प्रतीक्षा करें।' };
    }
    case 'OTP_LOCKED':
      return { en: 'Too many incorrect attempts. Please request a new OTP.', hi: 'बहुत अधिक गलत प्रयास। कृपया नया OTP मँगाएँ।' };
    case 'OTP_DELIVERY_FAILED':
      return { en: "We couldn't send the code right now. Please try again in a minute.", hi: 'अभी कोड नहीं भेजा जा सका। कृपया एक मिनट बाद पुनः प्रयास करें।' };
    case 'TOO_MANY_REQUESTS':
      return { en: 'Too many attempts. Please wait a while and try again.', hi: 'बहुत अधिक प्रयास। कृपया कुछ देर बाद पुनः प्रयास करें।' };
    case 'INVALID_CREDENTIALS':
      return { en: 'Incorrect email or password.', hi: 'ईमेल या पासवर्ड गलत है।' };
    case 'ACCOUNT_LOCKED': {
      const m = firstNumber(err.message);
      return {
        en: `Account temporarily locked after repeated failed sign-ins.${m ? ` Try again in ${m} minute(s).` : ''}`,
        hi: `बार-बार असफल प्रयासों के कारण खाता अस्थायी रूप से लॉक है।${m ? ` ${m} मिनट बाद पुनः प्रयास करें।` : ''}`,
      };
    }
    case 'ACCOUNT_DISABLED':
    case 'ACCOUNT_INACTIVE':
      return { en: 'This account has been disabled. Please contact support.', hi: 'यह खाता निष्क्रिय कर दिया गया है। कृपया सहायता से संपर्क करें।' };
    case 'REGISTRATION_DISABLED':
      return { en: 'New sign-ups are currently closed.', hi: 'नए पंजीकरण अभी बंद हैं।' };
    case 'CONFLICT':
      return { en: 'An account with these details already exists. Try signing in instead.', hi: 'इन विवरणों से खाता पहले से मौजूद है। कृपया साइन इन करें।' };
    case 'SOCIAL_TOKEN_INVALID':
      return { en: 'That sign-in could not be verified. Please try again.', hi: 'यह साइन-इन सत्यापित नहीं हो सका। कृपया पुनः प्रयास करें।' };
    case 'PROVIDER_DISABLED':
    case 'AUTH_METHOD_DISABLED':
      return { en: 'This sign-in method is not available right now.', hi: 'यह साइन-इन विधि अभी उपलब्ध नहीं है।' };
    case 'RESET_INVALID':
      return { en: 'This reset link is invalid or has expired. Please request a new one.', hi: 'यह रीसेट लिंक अमान्य या समाप्त है। कृपया नया लिंक मँगाएँ।' };
    case 'INVALID_PASSWORD':
      return { en: 'Your current password is incorrect.', hi: 'आपका वर्तमान पासवर्ड गलत है।' };
    case 'LAST_LOGIN_METHOD':
      return { en: 'Add a password or another sign-in method before removing this one.', hi: 'इसे हटाने से पहले पासवर्ड या अन्य साइन-इन विधि जोड़ें।' };
    case 'VALIDATION_ERROR': {
      const msg = err.details?.[0]?.message;
      return { en: msg || 'Please check the highlighted fields.', hi: msg || 'कृपया दर्ज जानकारी जाँचें।' };
    }
    default:
      return { en: err.message || 'Something went wrong. Please try again.', hi: 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।' };
  }
}
