export const ACCESS_TOKEN_KEY = 'token';
export const LOCAL_LNG = 'lang';

export const EnumOrderStatus = {
  pending: 'Chờ thanh toán',
  processing: 'Đang xử lý',
  delivering: 'Đang vận chuyển',
  delivered: 'Đã giao hàng',
  canceled: 'Đã hủy',
};

export const EnumPaymentMethod = {
  banking: 'Chuyển khoản trực tiếp',
  momowallet: 'Ví Momo',
  vnpayqr: 'VNPay QR',
  vnbank: 'VNPay nội địa',
  intcard: 'VNPay quốc tế',
  vnmart: 'ví điện tử VNMART',
};

export const OptionPayment = [
  {
    label: 'Thanh toán đơn hàng',
    value: 'product',
  },
  {
    label: 'Nạp xu',
    value: 'coin',
  },
];

export const Roles = {
  admin: 'Admin',
  user: 'Người Dùng',
  manager: 'Quản Lí',
  marketing: 'Tiếp Thị',
  cs: 'Chăm Sóc Khách Hàng',
  payment: 'Thanh Toán',
  product: 'Sản Phẩm',
  sale: 'Bán Hàng',
  instructor: 'Giảng Viên',
};

export const CanChi = {
  canh: {
    vn: 'Canh',
    color: '#e1161680',
  },
  tan: {
    vn: 'Tân',
    color: '#e116cf80',
  },
  nham: {
    vn: 'Nhâm',
    color: '#4e16e180',
  },
  quy: {
    vn: 'Quý',
    color: '#3c7ec980',
  },
  giap: {
    vn: 'Giáp',
    color: '#13a45b80',
  },
  at: {
    vn: 'Ất',
    color: '#063b0fde',
  },
  binh: {
    vn: 'Bính',
    color: '#575c04de',
  },
  dinh: {
    vn: 'Đinh',
    color: '#674204de',
  },
  mau: {
    vn: 'Mậu',
    color: '#700f07de',
  },
  ky: {
    vn: 'Kỷ',
    color: '#087160de',
  },

  than: {
    vn: 'Thân',
    color: '#999d07de',
  },
  dau: {
    vn: 'Dậu',
    color: '#9d6907de',
  },
  tuat: {
    vn: 'Tuất',
    color: '#cb530dde',
  },
  hoi: {
    vn: 'Hợi',
    color: '#660505de',
  },
  tys: {
    vn: 'Tý',
    color: '#980606de',
  },
  suu: {
    vn: 'Sửu',
    color: '#750245de',
  },
  dan: {
    vn: 'Dần',
    color: '#620373de',
  },
  mao: {
    vn: 'Mão',
    color: '#120385de',
  },
  thin: {
    vn: 'Thìn',
    color: '#044b64de',
  },
  tyj: {
    vn: 'Tỵ',
    color: '#045244de',
  },
  ngo: {
    vn: 'Ngọ',
    color: '#05601dde',
  },
  mui: {
    vn: 'Mùi',
    color: '#376b04de',
  },
};

export const HoangDao = {
  giap_tys: 'Giáp Tý',
  giap_dan: 'Giáp Dần',
  giap_thin: 'Giáp Thìn',
  giap_ngo: 'Giáp Ngọ',
  giap_than: 'Giáp Thân',
  giap_tuat: 'Giáp Tuất',
  at_suu: 'Ất Sửu',
  at_mao: 'Ất Mão',
  at_tyj: 'Ất Tỵ',
  at_mui: 'Ất Mùi',
  at_dau: 'Ất Dậu',
  at_hoi: 'Ất Hợi',
  binh_tys: 'Bính Tý',
  binh_dan: 'Bính Dần',
  binh_thin: 'Bính Thìn',
  binh_ngo: 'Bính Ngọ',
  binh_than: 'Bính Thân',
  binh_tuat: 'Bính Tuất',
  dinh_suu: 'Đinh Sửu',
  dinh_mao: 'Đinh Mão',
  dinh_tyj: 'Đinh Tỵ',
  dinh_mui: 'Đinh Mùi',
  dinh_dau: 'Đinh Dậu',
  dinh_hoi: 'Đinh Hợi',
  mau_tys: 'Mậu Tý',
  mau_dan: 'Mậu Dần',
  mau_thin: 'Mậu Thìn',
  mau_ngo: 'Mậu Ngọ',
  mau_than: 'Mậu Thân',
  mau_tuat: 'Mậu Tuất',
  ky_suu: 'Kỷ Sửu',
  ky_mao: 'Kỷ Mão',
  ky_tyj: 'Kỷ Tỵ',
  ky_mui: 'Kỷ Mùi',
  ky_dau: 'Kỷ Dậu',
  ky_hoi: 'Kỷ Hợi',
  canh_tys: 'Canh Tý',
  canh_dan: 'Canh Dần',
  canh_thin: 'Canh Thìn',
  canh_ngo: 'Canh Ngọ',
  canh_than: 'Canh Thân',
  canh_tuat: 'Canh Tuất',
  tan_suu: 'Tân Sửu',
  tan_mao: 'Tân Mão',
  tan_tyj: 'Tân Tỵ',
  tan_mui: 'Tân Mùi',
  tan_dau: 'Tân Dậu',
  tan_hoi: 'Tân Hợi',
  nham_tys: 'Nhâm Tý',
  nham_dan: 'Nhâm Dần',
  nham_thin: 'Nhâm Thìn',
  nham_ngo: 'Nhâm Ngọ',
  nham_than: 'Nhâm Thân',
  nham_tuat: 'Nhâm Tuất',
  quy_suu: 'Quý Sửu',
  quy_mao: 'Quý Mão',
  quy_tyj: 'Quý Tỵ',
  quy_mui: 'Quý Mùi',
  quy_dau: 'Quý Dậu',
  quy_hoi: 'Quý Hợi',
};

export const OrderTypes = {
  scheduleExpert: 'Đặt lịch chuyên gia',
  product: 'Vật phẩm',
  course: 'Khóa học',
};

export const OrderStatus = {
  pending: 'Chờ xử lý',
  processing: 'Đang tiến hành',
  finished: 'Đã hoàn thành',
  cancel: 'Khách hủy',
  reject: 'Từ chối',
};

export const EnumStatus = {
  pending: 'Chờ xử lý',
  active: 'Hoạt động',
  deactive: 'Tạm ngưng',
  processing: 'Đang tiến hành',
  finished: 'Đã hoàn thành',
  cancel: 'Đã hủy',
  reject: 'Từ chối',
  enable: 'Đang mở',
  disable: 'Đang khóa',
  updating: 'Đang cập nhật',
  completed: 'Đã hoàn tất',
  draft: 'Nháp',
  pause: 'Tạm ngưng',
};

export const SettingStatus = {
  enable: 'Luôn mở',
  completedFirst: 'Hoàn thành khóa học trước',
  openAll: 'Mở tất cả bài học',
  openOne: 'Mở từng cái',
  openCondition: 'Mở từng bài học sau khi hoàn thành bài trước đó',
  finished: 'Hoàn thành',
  unfinished: 'Chưa hoàn thành',
};

export const EnumMajors = {
  fengshui_home: 'Tư vấn phong thuỷ nhà ở',
  fengshui_nhahang_doanhnghiep: 'Tư vấn phong thuỷ nhà hàng, doanh nghiệp',
  fengshui_doanhnghiep: 'Tư vấn phong thuỷ doanh nghiệp',
  fengshui_amtrach: 'Tư vấn phong thuỷ âm trạch',
  fengshui_batdongsan: 'Tư vấn phong thuỷ mua bán bất động sản',
  fengshui_dothi: 'Tư vấn phong thuỷ quy hoạch đô thị',
  fengshui_nhatho: 'Tư vấn phong thuỷ nhà thờ',
  fengshui_nhamay: 'Tư vấn phong thuỷ nhà máy',
  xemngay: 'Tư vấn xem ngày',
  xemngay_vuongcat: 'Tư vấn xem ngày vượng cát',
  batdongsan_xaydung: 'Tư vấn giải pháp xây dựng',
  kymon: 'Dự đoán bằng kỳ môn độn giáp',
};

export const EnumAction = {
  deleteAccount: 'Xóa Tài Khoản',
  updateAccount: 'Cập Nhật Tài Khoản',
  signin: 'Đăng nhập',
  register: 'Đăng kí',
};

export const PRODUCT_PLATFORM = {
  widget: 'Nhúng bên thứ 3',
  app: 'Application',
  web: 'Website',
};

export const vietnameseRegex =
  /^[^àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]*$/;

export const MAJORS = [
  {
    key: 'fengshui_home',
    value: 'Tư vấn Phong thuỷ nhà ở',
  },
  {
    key: 'fengshui_nhahang_doanhnghiep',
    value: 'Tư vấn Phong thuỷ nhà hàng, doanh nghiệp',
  },
  {
    key: 'fengshui_doanhnghiep',
    value: 'Tư vấn Phong thuỷ doanh nghiệp',
  },
  {
    key: 'fengshui_amtrach',
    value: 'Tư vấn Phong thuỷ âm trạch',
  },
  {
    key: 'fengshui_batdongsan',
    value: 'Tư vấn Phong thuỷ mua bán bất động sản',
  },
  {
    key: 'fengshui_dothi',
    value: 'Tư vấn Phong thuỷ quy hoạch đô thị',
  },
  {
    key: 'fengshui_nhatho',
    value: 'Tư vấn Phong thuỷ nhà thờ',
  },
  {
    key: 'fengshui_nhamay',
    value: 'Tư vấn Phong thuỷ nhà máy',
  },
  {
    key: 'xemngay',
    value: 'Tư vấn Xem ngày',
  },
  {
    key: 'xemngay_vuongcat',
    value: 'Tư vấn Xem ngày vượng cát',
  },
  {
    key: 'batdongsan_xaydung',
    value: 'Tư vấn Giải pháp xây dựng',
  },
  {
    key: 'kymon',
    value: 'Luận đoán bằng Kỳ môn độn giáp',
  },
];

export const MAX_SIZE_IMAGE = 500;
