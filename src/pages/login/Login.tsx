import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.less';
import { login } from '../../api/index'

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login({ captchaId: '1', username, password })
    console.log(res)
    if (res.code === 0) {
      const data = res.data as { token: string; user: Record<string, unknown> };
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/')
    } else {
      alert(res.msg)
     }
    // 登录逻辑
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form-section">
          <img src="/logoWithTitle.png" alt="logo" className="login-logo" />
          <h2>登录</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="账号"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="密码"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <div className="login-remember">
              <input
                type="checkbox"
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
                id="remember"
              />
              <label htmlFor="remember">
                <span>同意</span>
                <a href="#">《用户协议及隐私政策》</a>
              </label>
            </div>
            <button type="submit" className="login-btn">Sign In</button>
          </form>
          <div className="login-or">Or</div>
          <div className="login-social">
            <img src="/google.svg" alt="Google" />
            <img src="/apple.svg" alt="Apple" />
            <img src="/facebook.svg" alt="Facebook" />
          </div>
          <div className="login-register">
            还没有账户？<a href="#">注册</a>
          </div>
        </div>
        <div className="login-image-section">
          <img src="/bg/login_bg.png" alt="login_bg" />
        </div>
      </div>
    </div>
  );
}