/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */
import {wrapPage} from 'utils';
import Home from './Home';
import Exam from './Exam';
import Task from './Task';
import SignUp from './SignUp';
import Extract from './Extract';

const PATH = '/web';
const routes = [
    {
        path:`${PATH}`,
        component:wrapPage('考务系统 – 首页', Home),
        name:'主页',
        icon:'user',
        exact:true,
    },{
        path:`${PATH}/exam`,
        component:wrapPage('考试信息管理', Exam),
        name:'考试信息管理',
        icon:'snippets',
        exact:true,
    },{
        path:`${PATH}/task`,
        component:wrapPage('我任务管理', Task),
        name:'我任务管理',
        icon:'user',
        exact:true,
    },{
        path:`${PATH}/signUp`,
        component:wrapPage('监考报名', SignUp),
        name:'监考报名',
        icon:'team',
        exact:true,
    },{
        path:`${PATH}/extract`,
        component:wrapPage('监考人员抽取', Extract),
        name:'监考人员抽取',
        icon:'radar-chart',
        exact:true,
    },{
        path:'/',
        redirect:true,
        to:`${PATH}`,
    }
]

export default routes