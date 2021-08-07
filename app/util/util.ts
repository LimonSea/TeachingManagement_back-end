export const Code = {
  ERROR: {
    status: 'error',
    msg: '请求失败',
  },
  SUCCESS: {
    status: 'ok',
    msg: '请求成功',
  },
};

export const MailContent = {
  register: (mail, url) => {
    return `<a href="mailto:${mail}" target="_blank">${mail}</a>, 您好！
      <br/><br/>
      欢迎使用 WindHunter 教师工作室管理平台，这是一封邮箱真实性验证邮件，邮箱验证地址链接为：
      <a href="${url}" target="_blank">${url}</a>
      该链接将于24小时后失效，请及时进行验证！
      <br/><br/>
      <span style="#999">此邮件是系统自动发出，无需回复。</span>
    `;
  },
};

export const MailExpTime = 60 * 60 * 24; // 过期时间24小时
