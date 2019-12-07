/**
 * 订单配置参数
 */
export interface OrderConfigParams {
  kxProductShowType?: string;
  kxOrderSort?: string;
  kxAutoMerge?: boolean;
  fpAutoMerge?: boolean;
  fpOrderSort?: string;
}

/**
 * 翻页查询参数
 */
export interface ConfigQueryPageParams {
  currentPage: number;
  size: number;
  needCount: boolean;
}

/**
 * 地址列表item
 */
export interface ConfigAddressItem {
  id: number;
  consignee: string;
  phone: string;
  deliverySign: string;
  postCode: string;
  province: string;
  provinceCode: number;
  city: string;
  cityCode: number;
  district: string;
  districtCode: number;
  address: string;
  street: string;
  createTime: string;
  updateTime: string;
  isDeleted: boolean;
  userId: string;
  shopId: string;
  isDefault: boolean;
}

/**
 * 翻页查询地址列表
 */
export interface ConfigAddressResult {
  totalCount: number;
  pageSize: number;
  pageNo: number;
  orderStr: null;
  items: ConfigAddressItem[];
  empty: boolean;
  offset: number;
  beginIndex: number;
  endIndex: number;
  lastPage: boolean;
  totalPage: number;
  firstPage: boolean;
  limit: number;
}

/**
 * 创建收货地址
 */
export interface CreateConfigAddress {
  deliveryName?: string;
  phone?: string;
  deliverySign?: string;
  postCode?: string;
  provinceCode?: string;
  cityCode?: string;
  districtCode?: string;
  address?: string;
  street?: string;
  createTime?: string;
  updateTime?: string;
  isDeleted?: boolean;
  userId?: string;
  shopId?: string;
  isDefault?: boolean;
}

/**
 * 更新收货地址
 */
export interface UpdateConfigAddress extends CreateConfigAddress {
  id: number;
}

export interface ConfigParams {
  key: string;
  value: any;
}
export interface ColumnSettingItem {
  prop: string;
  label: string;
  type: string;
  width: string;
  checked: boolean;
}
