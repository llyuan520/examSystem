/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */
/**输出带子路由的路由*/
import RouteWithSubRoutes from './RouteWithSubRoutes'

/**给页面增加标题的组件*/
import wrapPage from './TitlePage'
import NavRouter from './Nav'
import AsyncTable from './AsyncTable'
import CusFormItem from './FormItems'
import {AutoFileUpload,ManualFileUpload} from './FileUpload'
import FileExport from './FileExport'
import SearchTable from './SearchTable'
import {FileImportModal,FileUndoImportModal} from './FileImportModal'
import ButtonModalWithForm from './ButtonModalWithForm'
import ButtonWithFileUploadModal from './ButtonWithFileUploadModal'
import TreeTable from './TreeTable'
import LoadingPage from './LoadingPage'
import FileDownload from "./FileDownload"
import Breadcrumb from './Breadcrumb'
import Header from "./Header"
import DescriptionList from './DescriptionList'

/**react懒加载组件*/
import AsyncComponent from './AsyncComponent'

export {
    RouteWithSubRoutes,
    wrapPage,
    NavRouter,
    AsyncTable,
    CusFormItem,
    AutoFileUpload,
    ManualFileUpload,
    FileExport,
    SearchTable,
    FileImportModal,
    FileUndoImportModal,
    ButtonModalWithForm,
    ButtonWithFileUploadModal,
    TreeTable,
    LoadingPage,
    AsyncComponent,
    FileDownload,
    Breadcrumb,
    Header,
    DescriptionList,
}