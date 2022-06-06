// 左侧学生数据表单组件
// 导入 React 和 Compoent 模块
import { Component } from "react";

// 创建 StudentAdd 类组件
class StudentAdd extends Component {
  constructor() {
    // 因为 StudentAdd 是继承自 Component，当设置 constructor 构造方法的时候，也需要使用 super 去继承 component 里面的构造方法
    super();
    this.handleState = this.handleState.bind(this);
  }

  // 定义状态
  state = {
    number: "", // 学号
    name: "", // 姓名
    sex: "男", // 性别
    age: "", // 年龄
    date: "", // 入学时间
    college: "大前端", // 学科
    // 爱好
    hobbies: [
      {
        id: 1,
        title: "足球",
        isChecked: false
      },
      {
        id: 2,
        title: "篮球",
        isChecked: false
      },
      {
        id: 3,
        title: "橄榄球",
        isChecked: false
      }
    ]
  };

  // 拷贝 state 状态数据，为了方便以后提交表单后，将界面数据清空
  originState = JSON.parse(JSON.stringify(this.state));

  // 操作状态数据的方法
  handleState(event) {
    // 获取修改后的数据
    const newValue = event.target.value;
    // 获取要修改的值的 name
    const prop = event.target.name;

    // 更新数据
    this.setState({
      [prop]: newValue
    });
  }

  // 更新 hobbies 的数据
  handleHobbies(index, event) {
    // 当前复选框选中的状态
    const isChecked = event.target.checked;

    // 将状态中的 hobbies 数据重新进行保存，不要直接修改 state 里面的 hobbies
    const newHobbies = [...this.state.hobbies];

    // 找到对应下标的复选框，更新其选中的状态
    newHobbies[index].isChecked = isChecked;

    // 更新数据
    this.setState({
      hobbies: newHobbies
    });
  }

  // 提交表单事件
  handleSubmit = (event) => {
    // 关闭默认事件
    event.preventDefault();

    // 提交的时候需要将表单中的有用信息，整合在一起
    // 1. 筛选出当前选中的 hobbies 数据
    const hobbies = this.state.hobbies
      .filter((hobby) => hobby.isChecked) // 过滤出被选中的 hobbies
      .map((hobby) => hobby.title); // 选出选中的 hobbies 的 title

    // 2. 整合真正要提交的数据
    const formData = {
      ...this.state,
      hobbies
    };

    // 3. 调用父组件的 addStudent 事件，将当前学生数据传递给父组件
    this.props.addStudent(formData, () => {
      // 4. 还原表单默认数据（清空表单）
      this.setState(JSON.parse(JSON.stringify(this.originState)));
    });
  };

  render() {
    return (
      <div className="col-md-5">
        {/* 表单 */}
        <form onSubmit={this.handleSubmit}>
          {/* 学号 */}
          <div className="form-group">
            <label>学号</label>
            <input
              type="text"
              name={"number"}
              value={this.state.number}
              className="form-control"
              placeholder="请输入学号"
              onChange={this.handleState}
            />
          </div>

          {/* 姓名 */}
          <div className="form-group">
            <label>姓名</label>
            <input
              type="text"
              name={"name"}
              value={this.state.name}
              className="form-control"
              placeholder="请输入姓名"
              onChange={this.handleState}
            />
          </div>

          {/* 性别单选框 */}
          <div className="form-group">
            <label>性别&nbsp;&nbsp;</label>
            <label className="checkbox-inline">
              <input
                type="radio"
                name={"sex"}
                value="男"
                checked={this.state.sex === "男"}
                onChange={this.handleState}
              />{" "}
              男
            </label>
            <label className="checkbox-inline">
              <input
                type="radio"
                name={"sex"}
                value="女"
                checked={this.state.sex === "女"}
                onChange={this.handleState}
              />{" "}
              女
            </label>
          </div>

          {/* 年龄滚动选框框 */}
          <div className="form-group">
            <label>年龄</label>
            <input
              type="number"
              name={"age"}
              value={this.state.age}
              className="form-control"
              placeholder="请输入年龄"
              onChange={this.handleState}
            />
          </div>

          {/* 入学时间 */}
          <div className="form-group">
            <label>入学时间</label>
            <input
              name={"date"}
              type="date"
              value={this.state.date}
              className="form-control"
              onChange={this.handleState}
            />
          </div>

          {/* 爱好复选框 */}
          <div className="form-group">
            <label>爱好</label>
            {/* 循环渲染爱好复选框 */}
            {this.state.hobbies.map((hobby, index) => {
              return (
                <div className="checkbox" key={hobby.id}>
                  <label>
                    <input
                      type="checkbox"
                      value={hobby.title}
                      checked={hobby.isChecked}
                      onChange={this.handleHobbies.bind(this, index)}
                    />{" "}
                    {hobby.title}
                  </label>
                </div>
              );
            })}
          </div>

          {/* 下拉选框 */}
          <div className="form-group">
            <label>所属学院</label>
            <select
              name={"college"}
              value={this.state.college}
              className="form-control"
              onChange={this.handleState}
            >
              <option value="大前端">大前端</option>
              <option value="Java">Java</option>
              <option value="python">python</option>
            </select>
          </div>

          {/* 添加学生按钮 */}
          <button type="submit" className="btn btn-default">
            添加
          </button>
        </form>
      </div>
    );
  }
}

export default StudentAdd; // 导出
