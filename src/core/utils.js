import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { message } from 'antd';
import moment from 'moment';

export const emptyObject = (obj) => {
  return (
    !obj ||
    (Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype)
  );
};

export const emptyArray = (arr) => {
  return !arr || !arr.length;
};

export const nvl = (value1, value2) => {
  if (!value1) return value2;
  return value1;
};

const fileType =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

export const exportToCSV = (dataExport, name) => {
  const ws = XLSX.utils.json_to_sheet(dataExport);
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(
    data,
    `${name || 'campaign'}-${moment(moment().unix() * 1000).format(
      'YYYYMMDDHHmmss'
    )}` + fileExtension
  );
};

export function numberWithCommas(x) {
  if (!x) return 0;
  return new Intl.NumberFormat('vi-VN').format(x);
}

export const truncateHash = (str, startLength = 4, endLength = 4) => {
  if (!str) {
    return null;
  }
  return `${str.substring(0, startLength)}...${str.substring(
    str.length - endLength
  )}`;
};

export const copyText = (text) => {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  message.success('Copied');
};

export const renderColorStatus = (status) => {
  switch (status) {
    case 'active':
      return 'text-green-700';
    case 'enable':
      return 'text-green-700';
    case 'completed':
      return 'text-green-700';
    case 'deactive':
      return 'text-red-700';
    case 'disable':
      return 'text-red-700';
    case 'pending':
      return 'text-[#d3c718]';
    case 'processing':
      return 'text-[#1890ff]';
    case 'finished':
      return 'text-green-700';
    case 'reject':
      return 'text-red-700';
    case 'Canceled':
      return 'text-red-700';
    case 'updating':
      return 'text-yellow-400';
    default:
      return 'text-[#d3c718]';
  }
};
export const renderBgColorStatus = (status) => {
  switch (status) {
    case 'active':
      return 'from-emerald-500 to-teal-400';
    case 'enable':
      return 'from-emerald-500 to-teal-400';
    case 'completed':
      return 'from-emerald-500 to-teal-400';
    case 'deactive':
      return 'from-slate-600 to-slate-300';
    case 'disable':
      return 'from-slate-600 to-slate-300';
    case 'draft':
      return 'from-slate-600 to-slate-300';
    case 'pending':
      return 'from-orange-600 to-orange-300';
    case 'updating':
      return 'from-slate-600 to-slate-300';
      case 'Canceled':
      return 'from-red-600 to-red-300';
    case 'reject':
        return 'from-red-600 to-red-300';
    default:
      return 'from-emerald-500 to-teal-400';
  }
};

export const removeNullUndefined = (obj) => {
  // Create a new object to store the cleaned properties
  const result = {};

  // Iterate over each key in the input object
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      // Check if the value is not null or undefined
      if (value !== null && value !== undefined) {
        result[key] = value; // Include the key-value pair in the result
      }
    }
  }

  return result;
};
