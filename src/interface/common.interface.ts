export interface ProvinceListItem {
  provinceCode: number;
  provinceName: string;
}

export interface CityListItem {
  cityCode: number;
  cityName: string;
}

export interface DistrictItem {
  districtCode: number;
  districtName: string;
}

export interface CityListResult {
  provinceDTO: ProvinceListItem;
  cityDTOList: CityListItem[];
}

export interface DistrictListResult {
  cityDTO: CityListItem;
  districtDTOList: DistrictItem[];
}

export interface UserInfo {
  createTime: string;
  nick: string;
  status: number;
}

/**
 * 分页查询返回结果
 */
export interface QueryPageCommonResult {
  beginIndex: number;
  empty: boolean;
  endIndex: number;
  firstPage: boolean;
  lastPage: boolean;
  limit: number;
  offset: number;
  orderStr: string;
  pageNo: number;
  pageSize: number;
  totalCount: number;
  totalPage: number;
}
