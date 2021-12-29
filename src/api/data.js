import request from '@/utils/request';

export function getCardList() {
  return request({
    url: '/user/card/card-list',
    method: 'get',
  });
}

export function submitKycData(data) {
  return request({
    url: '/user/kyc-1',
    method: 'post',
    data,
  });
}

export function submitKycAuth(data) {
  return request({
    url: '/user/kyc-2',
    method: 'post',
    data,
  });
}

export function getChargeRecord(params) {
  return request({
    url: '/user/deposit-transactions',
    method: 'get',
    params,
  });
}

export function getCardBalance(no) {
  return request({
    url: '/user/bank/balance',
    method: 'post',
    data: {
      card_no: no,
    },
  });
}

export function getCardChargeAddress(id) {
  return request({
    url: '/user/card/address-info',
    method: 'get',
    params: {
      card_type_id: id,
    },
  });
}

export function getBillRecord(data) {
  return request({
    url: '/user/bank/transaction-record',
    method: 'post',
    data,
  });
}

export function getBillDetail(data) {
  return request({
    url: '/user/bank/transaction-record',
    method: 'get',
    params: data,
  });
}

export function getKycStatus(cardTypeId) {
  return request({
    url: '/user/kyc-status',
    method: 'get',
    params: {
      card_type_id: cardTypeId,
    },
  });
}

export function getCardTypeInfo(cardTypeId) {
  return request({
    url: '/user/card/card-detail',
    method: 'get',
    params: {
      card_type_id: cardTypeId,
    },
  });
}

export function getCardRealNumber(cardNo) {
  return request({
    url: '/user/card/card-number',
    method: 'get',
    params: {
      card_no: cardNo,
    },
  });
}

export function getCouponList(params) {
  return request({
    url: '/user/coupon',
    method: 'get',
    params,
  });
}

export function postCoupon(params) {
  return request({
    url: '/user/coupon',
    method: 'post',
    params,
  });
}

export function giveCoupon(params) {
  return request({
    url: '/user/coupon/gift',
    method: 'POST',
    params,
  });
}

export function postCouponExchange(code) {
  return request({
    url: '/user/coupon/exchange',
    method: 'post',
    params: {
      coupon_code: code,
    },
  });
}

export function getCouponInviCode() {
  return request({
    url: '/user/coupon/invitation-code',
    method: 'get',
    params: {},
  });
}

export function postCouponInviCode(code) {
  return request({
    url: '/user/coupon/invitation-code',
    method: 'post',
    params: {
      invitation_code: code,
    },
  });
}

export function getUserInfo() {
  return request({
    url: '/user/user-info',
    method: 'get',
    params: {},
  });
}

export function postFeedback(data) {
  return request({
    url: '/user/feedback',
    method: 'post',
    data,
  });
}

// simple
export function submitSimpleKycData(data) {
  return request({
    url: '/api/v1/simple/account-info',
    method: 'post',
    data,
  });
}

export function searchRates(params) {
  return request({
    url: '/api/v1/buycrypto',
    headers: {
      Authorization: params.authorization,
    },
    method: 'post',
    data: params,
  });
}

export function advOrder(data) {
  return request({
    url: '/api/v1/order',
    headers: {
      Authorization: data.authorization,
    },
    method: 'post',
    data,
  });
}

export function advPayment(data, headers) {
  return request({
    url: '/api/v1/payment',
    method: 'post',
    headers,
    data,
  });
}
