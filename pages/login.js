import React, {useEffect, useState} from "react";
import styles from "../styles/Login.module.scss";
import Link from "next/link";
import Router from "next/router";

function Login(){
    const initialValues = {username: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setisSubmit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        setisSubmit(true);
        if (Object.keys(errors).length === 0){
            if (authorize(formValues)){
                Router.push("/admin");
            }
        }
    };

    const handleChange = (e) => {
        const{ name, value } = e.target;
        const values = { ...formValues, [name]: value };
        setFormValues(values);
        e.preventDefault();
        setisSubmit(false);
    };
    
    useEffect(() => {
        setFormErrors(validate(formValues));
    }, [formValues]);

    const authorize = (values) => {
        if (values.username !== "user"){
            return false;
        }
        if (values.password !== "password"){
            return false;
        }
        return true;
    };

    const validate = (values) => {
        const errors = {};
        if (!formValues.username){
            errors.username = "ユーザー名を入力してください";
        }
        if (!formValues.password){
             errors.password= "パスワードを入力してください";
        }else if (formValues.password.length < 4 || formValues.password.length > 15) {
            errors.password ="4文字以上15文字以下のパスワードを入力してください";
        }
        return errors;
    };

    return(
        <div className= {styles.Login}>
            <form onSubmit={(e) => handleSubmit(e)}> 
                <h1 className={styles.title}>ログインフォーム</h1>
                <hr className={styles.hr}/>
                <div className={styles.uiForm}>
                    <div className={styles.formField}>
                        <label>ユーザー名</label>
                        <input 
                            type="text" 
                            placeholder="ユーザー名" 
                            name="username" 
                            onChange={(e)=> handleChange(e)}
                            className={styles.input}
                        />
                    </div>
                </div>
                <p className={styles.errorsmessage}>{formErrors.username}</p>
                <div className={styles.lsuiForm}>
                    <div className={styles.formField}>
                        <label>パスワード</label>
                        <input 
                            type="password" 
                            placeholder="パスワード" 
                            name="password"
                            onChange={(e)=> handleChange(e)}
                            className={styles.input}
                        />
                    </div>
                </div>
                <p className={styles.errorsmessage}>{formErrors.password}</p>
                <div>
                    <button>ログイン</button>
                    {Object.keys(formErrors).length === 0 && isSubmit &&(
                        <div className={styles.ok}>ログインに失敗しました</div>
                    )}
                </div>
                <Link href="/">
                <button>戻る</button>
                </Link>
            </form>
        </div>
    );
}


export default Login;