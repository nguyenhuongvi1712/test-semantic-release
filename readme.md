## React Portal
- **React Portal** cho phép render một phần HTML đôc lập với **component trees** (root).
- Cách sử dụng :
    ``` 
    import React from 'react'
    import ReactDOM from 'react-dom'

    function Modal({ children }) {
        return ReactDOM.createPortal(
            <div id="modal-wrapper">
                {children}
            </div>,
            document.querySelector('body'),
        )
    }

    export default Modal
    ```
- Render: 
    ```
    <html>
        <head></head>
        <body>
            <div id="root"></div>
            <div id="modal-wrapper"></div>
        </body>
    </html>
    ```
- Phần style của modal-wrapper sẽ không bị ảnh hưởng bởi level mà Modal được render bên trong component tree của project, mà chỉ ảnh hưởng bởi global style.
- Mặc dù Portal được sinh ra cùng với với thẻ div root trên DOM, có style không bị ảnh hưởng bởi component tree, tuy nhiên về event lại thể hiện như một phần tử bên trong component tree.

## React Context
> "Context is designed to share data that can be considered “global” for a tree of React components"
- **React Context API** là cách tạo các biến toàn cục có thể sử dngj trong toàn ứng dụng, cung cấp cơ chế định nghĩa các data store và truy xuất chúng khi cần. 
- Cách sử dụng :
  - Tạo Context :
    ```
    const AppContext = React.createContext()
    ```
  - Providing Context : Provider chứa dữ liệu cần lưu trữ để có thể inject dữ liệu từ atttribute *value*.
    ```
    const AppProvider = (props) => {
        return (
            <AppContext.Provider value={st}>
                {props.children}
            </AppContext.Provider>
        )
    }

    // wrap component 
    function App() {
        return (
            <AppProvider>
                ....
            </AppProvider>
        );
    }

    ```
  - Consuming Context : 
    ```
    const home = useContext(UserContext) 
    ```
- Đây là hook thường được sử dụng cùng với **useReducer** để thay đổi giá trị của global state. 

## React Reducer
- **useReducer** là một phiên bản nâng cao hơn của **useState**, thường được sử dụng trong trường hợp local state của component phức tạp (nested object/array), có nhiều action làm thay đổi state đó.
- Cách sử dụng : 
  - Tạo reducer: 1 hàm chuyển đổi có 2 tham số là state và action, trả về new state sau khi thực hiện 1 action.
    ```
    const todoReducer = (state,action) => {
        if(action.type === 'todo_1')
        return {...action.value}
        else if(action.type === 'todo_2')
        return {...action.item}
        else
        return state
    }
    ```
  - Tạo useReducer hook: **useReducer** function nhận vào 2 tham số là **reducer** và giá trị khởi tạo ban đầu **initialState** , trả về **state** hiện tại và **dispatch** function dùng để trigger 1 action. 
    ```
    const [todo, dispatchTodoAction] = useReducer(todoReducer, initialTodo)
    const handleTodo1 = (value) => {
        dispatchTodoAction({type: 'todo_1', value})
    }
    const handleTodo2 = (item) => {
        dispatchTodoAction({type: 'todo_2', item})
    }
    ```

## Refs, useRef, forwardRef
- Ref là viết tắt của reference, là 1 thuộc tính của 1 thẻ jsx và tham chiếu tới chính nó. Ref cho phép truy cập trực tiếp đến element và sử đổi nó ngay lập tức mà không cần đến props hay state để component bị re-render lại. 
- Cách sử dụng;
  - Khởi tạo ref: sử dụng enteredInput gắn vào component Input để truy suất và điều khiển thuộc tính của component Input, được access thông qua **ref.current** 
    ```
    const enteredInput = useRef()
    const handleOnChange = () => {
        console.log('entered input', enteredInput.current.value)
    }
    return (
        <Input ref={enteredInput} onChange={handleOnChange}></Input>
    )
    ```
  - Khi muốn pass ref từ component cha xuống component con,và component con là 1 function component thì phải sử dụng **forwardRef**.
    ```
    const Input = React.forwardRef((props,ref) => {
        return (
            <input ref={ref} onChange={props.onChange}>
        )
    })
    ```
- Sử dụng ref trong 1 số use cases như làm việc với animation, text selection, focus, media playback. Ref trỏ trực tiếp vào DOM thật trong khi React sử dụng DOM. 