import Vue from "vue";
import "./assets/theme/index.css";
import {
  Button,
  Row,
  Col,
  Upload,
  Form,
  FormItem,
  Dialog,
  Option,
  Menu,
  MenuItem,
  Submenu,
  Container,
  Pagination,
  Link,
  Header,
  Main,
  Footer,
  Select,
  Aside,
  Input,
  Checkbox,
  DatePicker,
  Avatar,
  Loading,
  MessageBox,
  Notification,
  Message,
  Table,
  TableColumn,
  Dropdown,
  Popover,
  Backtop,
  Image,
  TabPane,
  Tabs
} from "element-ui";

Vue.use(Button);
Vue.use(Container);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Link);
Vue.use(Header);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Option);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Footer);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Checkbox);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Aside);
Vue.use(Input);
Vue.use(Avatar);
Vue.use(Dropdown);
Vue.use(Popover);
Vue.use(Backtop);
Vue.use(Image);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

Vue.prototype.$ELEMENT = { size: "small" };
