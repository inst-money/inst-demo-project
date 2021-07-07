import dayjs from 'dayjs';

export function formatLongStr(val, mid = '...', start = 6, end = 6) {
  if (val.length > start + end) {
    return `${val.substr(0, start)}${mid}${val.substr(val.length - end, end)}`;
  }
  return val;
}

export function parseTime(timestamp, cFormat) {
  let time = timestamp;
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time, 10);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time *= 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  return format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    } // todo 支持英文
    return value.toString().padStart(2, '0');
  });
}

export const blob2Base64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    resolve(e.target.result);
  };
  reader.onerror = (e) => {
    reject(e);
  };
  reader.readAsDataURL(file);
});

export function formatDate(value) {
  if (!value) {
    return '';
  }
  return dayjs(value).format('YYYY-MM-DD');
}
