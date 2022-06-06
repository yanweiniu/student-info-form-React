// 右侧学生列表组件
// 导入 React 和 Compoent 模块
import { Component } from "react";

// 创建 StudentList 类组件
class StudentList extends Component {
  // 删除学生数据点击事件
  handleRemove(number, event) {
    // 关闭 a 标签的默认跳转事件
    event.preventDefault();

    // 先弹框，让用户判断一次是否删除
    if (window.confirm("是否删除当前项")) {
      // 调用父组件中的 removeStudent 事件
      this.props.removeStudent(number);
    }
  }

  render() {
    // 获取父组件传递过来的学生列表数据
    const { studentList } = this.props;

    // 存放学生总数
    const studentNum = studentList.length;

    // 存放学生平局年龄
    const averAge =
      studentList.reduce((acc, student) => {
        return (acc += student.age);
      }, 0) / studentNum || 0;

    return (
      <div className="col-md-6 col-md-offset-1">
        {/* 表格 */}
        <table className="table table-striped table-hover">
          {/* 表头 */}
          <thead>
            <tr>
              <th>学号</th>
              <th>姓名</th>
              <th>性别</th>
              <th>年龄</th>
              <th>入学时间</th>
              <th>爱好</th>
              <th>所属学院</th>
              <th>操作</th>
            </tr>
          </thead>
          {/* 学生信息 */}
          <tbody>
            {/* 循环渲染学生数据列表 */}
            {studentList.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{student.number}</td>
                  <td>{student.name}</td>
                  <td>{student.sex}</td>
                  <td>{student.age}</td>
                  <td>{student.date}</td>
                  {/* 循环遍历 hobbies 数组 */}
                  <td>
                    {student.hobbies.map((hobby, index) => {
                      return <span key={index}>{hobby}</span>;
                    })}
                  </td>
                  <td>{student.college}</td>
                  <td>
                    <button
                      onClick={this.handleRemove.bind(
                        this,
                        `${student.number}`
                      )}
                    >
                      删除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* 学生数据列表数据综合显示 */}
        {/* 当学生数据为空的时候，就显示无学生信息这一段话 */}
        {studentList.length > 0 ? null : (
          <p className="text-center">无学生信息</p>
        )}
        {/* 计算学生总数 */}
        <p>总共有 {studentNum} 个学生</p>
        {/* 计算学生平均年龄 */}
        <p>学生的平均年龄是 {averAge}</p>
      </div>
    );
  }
}

export default StudentList; // 导出
