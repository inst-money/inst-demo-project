import request from '@/utils/request';

export function getNonce(address) {
  return request({
    url: '/user/token/nonce',
    method: 'post',
    data: {
      address,
    },
  });
}

export function submitLogin(data) {
  return request({
    url: '/user/token/login',
    method: 'post',
    data,
  });
}

export function sendEmail(mail) {
  return request({
    url: '/user/common/security/mail',
    method: 'post',
    data: {
      mail,
    },
  });
}

export function getKycProcess(id) {
  return request({
    url: '/user/kyc-process',
    method: 'get',
    params: {
      card_type_id: id,
    },
  });
}

// 简易
export function sendSimpleEmail(params) {
  return request({
    url: `/api/v1/simple/emails/${params.email}/verification-codes?acct_no=${params.acct_no}&card_type_id=${params.card_type_id}&cust_id=${params.cust_id}`,
    method: 'post',
    data: {},
  });
}
