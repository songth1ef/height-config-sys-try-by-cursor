'use client'

import React from 'react'
import { useAuthStore } from '@/stores/authStore'

const ProfileModule: React.FC = () => {
  const { user } = useAuthStore()

  if (!user) {
    return <div>用户信息未找到</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">个人资料</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt="头像" 
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl text-gray-600">
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex space-x-2 mt-2">
              {user.role.map((role) => (
                <span 
                  key={role}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">基本信息</h3>
            <div className="space-y-2">
              <div>
                <label className="text-sm text-gray-600">姓名</label>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">邮箱</label>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">注册时间</label>
                <p className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString('zh-CN')}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">权限信息</h3>
            <div className="space-y-2">
              <div>
                <label className="text-sm text-gray-600">角色</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.role.map((role) => (
                    <span 
                      key={role}
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">权限</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.permissions.map((permission) => (
                    <span 
                      key={permission}
                      className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            编辑资料
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileModule
