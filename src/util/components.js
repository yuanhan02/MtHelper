import { Tab, Tabs, Calendar, Cell, Tabbar, TabbarItem, Search, CellGroup, Empty, Divider, NavBar, NoticeBar, Field, Button, Icon, DropdownMenu, DropdownItem, List, PullRefresh, Panel,Toast } from 'vant'
import VeLine from 'v-charts/lib/line.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VeBar from 'v-charts/lib/bar.common'

export default (Vue)=>{
    Vue.component(Tab.name,Tab)
		Vue.component(Tabs.name,Tabs)
		Vue.component(Calendar.name,Calendar)
		Vue.component(Cell.name,Cell)
		Vue.component(VeLine.name,VeLine)
		Vue.component(VeHistogram.name,VeHistogram)
		Vue.component(VeBar.name,VeBar)
		Vue.component(Tabbar.name,Tabbar)
		Vue.component(TabbarItem.name,TabbarItem)
		Vue.component(Search.name, Search)
		Vue.component(Cell.name, Cell)
		Vue.component(CellGroup.name, CellGroup)
		Vue.component(Empty.name, Empty)
		Vue.component(Divider.name, Divider)
		Vue.component(NavBar.name,NavBar)
		Vue.component(NoticeBar.name,NoticeBar)
		Vue.component(Field.name,Field)
		Vue.component(Button.name,Button)
		Vue.component(Icon.name,Icon)
		Vue.component(DropdownMenu.name,DropdownMenu)
		Vue.component(DropdownItem.name,DropdownItem)
		Vue.component(List.name,List)
		Vue.component(PullRefresh.name,PullRefresh)
		Vue.component(Panel.name,Panel)
		Vue.component(Toast.name,Toast)
  }