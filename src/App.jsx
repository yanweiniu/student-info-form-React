// 导入 React 和 Compoent 模块
import { Component } from "react";

// 标题组件
import StudentTitle from "./components/StudentTitle";
// 添加学生信息表单组件
import StudentAdd from "./components/StudentAdd";
// 显示学生信息表格组件
import StudentList from "./components/StudentList";

// 创建 App 类组件
class App extends Component {
  // 定义状态
  state = {
    // 学生的数据列表
    studentList: [
      {
        number: "01",
        name: "张三",
        sex: "男",
        age: 10,
        date: "2020-12-04",
        hobbies: ["足球", "篮球"],
        college: "大前端"
      },
      {
        number: "02",
        name: "李四",
        sex: "男",
        age: 20,
        date: "2030-12-05",
        hobbies: ["足球", "橄榄球"],
        college: "Java"
      },
      {
        number: "03",
        name: "王五",
        sex: "男",
        age: 30,
        date: "2040-11-03",
        hobbies: ["足球", "橄榄球", "篮球"],
        college: "python"
      }
    ]
  };

  // 定义一个方法用于处理 studentList 状态
  addStudent = (student, callback) => {
    this.setState(
      {
        // 更新数据的时候，需要将选来的数据获取到，将新数据添加在后面
        studentList: [...this.state.studentList, student]
      },
      () => {
        callback(); // 调用子组件传递过来的清空表单的事件
      }
    );
  };

  // 定义删除学生数据操作
  removeStudent = (number) => {
    // 根据子组件传递过来的学生学号，删除对应的学生数据
    // 1. 将原数据进行拷贝
    const originState = JSON.parse(JSON.stringify(this.state.studentList));

    // 2. 从原数据根据 number 将对应的数据找出来
    const currentIndex = originState.findIndex(
      (student) => student.number === number
    );

    // 3. 利用 currentIndex，删除 originState 中对应的项
    originState.splice(currentIndex, 1);

    // 4. 更新 state 里面的数据
    this.setState({
      studentList: JSON.parse(JSON.stringify(originState))
    });
  };

  render() {
    return (
      <div className={"container"}>
        <StudentTitle />
        {/* 给子组件传递一个添加数据的事件 */}
        <StudentAdd addStudent={this.addStudent} />
        {/* 给子组件传递学生列表数据 */}
        <StudentList
          studentList={this.state.studentList}
          removeStudent={this.removeStudent}
        />
      </div>
    );
  }
}

export default App; // 导出
