import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import axios, { AxiosError } from 'axios'

import Closeeye from '../assets/images/Closeeye.png'
import Openeye from '../assets/images/Openeye.png'

import '../assets/LoginPage.css'

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const emailRegex = /^[a-zA-Z0-9._%+-]+@kangnam\.ac\.kr$/;
  if (!emailRegex.test(formData.email)) {
    setError('강남대학교 이메일(@kangnam.ac.kr) 형식이 아닙니다.');
    setIsLoading(false);
    return;
  }

    try {
      const response = await axios.post('https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/login', formData, {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
      })

      // console.log('[로그인 응답, 토큰값]', response.data)
      // JWT 토큰 저장
      localStorage.setItem('token', response.data)

      // 로그인 상태 업데이트
      login({
        name: '',
        department: '',
        part: '',
        studentId: '',
        grade: '',
        phone: '',
        email: formData.email,
        password: formData.password,
        apply: false,
        token: response.data,
      })

      navigate('/')
    } catch (err : unknown) {
      // console.error('[로그인 에러]', err)
      if (axios.isAxiosError(err)) {
        setError((err as AxiosError<{ message: string }>).response?.data?.message || '이메일 또는 비밀번호가 틀렸습니다.')
      } else {
        setError(`서버 오류가 발생했습니다. ${(err as Error).message}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h1>
          강남대학교 멋쟁이사자처럼에 <br />
          오신걸 환영해요!
        </h1>

        <div>
          <form onSubmit={handleLogin}>
            <div>
              <input
                type='email'
                name='email'
                placeholder='강남대학교 메일(@kangnam.ac.kr)'
                value={formData.email}
                onChange={handleChange}
              />
              <div className='password-input'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='비밀번호'
                  value={formData.password}
                  onChange={handleChange}
                />
                <img
                  src={showPassword ? Openeye : Closeeye}
                  alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
                  className='password-toggle-icon'
                  onClick={() => setShowPassword((prev) => !prev)}
                />
                {error && <div className='password-error'>{error}</div>}
              </div>
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='login-button'
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <Link
            to='/signup'
            className='signup-link'
          >
            <button className='signup-button'>회원가입</button>
          </Link>
        </div>
        <Link to='/forgot-password'>
          <div className='find-password'> 비밀번호 찾기 </div>
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
