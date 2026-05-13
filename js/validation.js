/**
 * =====================================================
 * 表单验证模块（validation.js）
 * =====================================================
 * 使用 jQuery 实现联系我们表单的实时验证和提交处理
 * 
 * 功能特性：
 * - 实时验证：输入框失焦时立即验证
 * - 提交验证：提交前全量验证所有字段
 * - 错误提示：红色文字显示在对应输入框下方
 * - 成功提示：绿色文字淡入显示
 * - 字数统计：留言区域实时显示字数
 * =====================================================
 */

/**
 * 表单验证配置
 * 定义各字段的验证规则和错误提示信息
 */
var formValidationConfig = {
  // 姓名验证规则
  name: {
    // 验证函数：2-20个字符
    validate: function(value) {
      var length = value.replace(/[\u4e00-\u9fa5]/g, '**').length; // 中文字符按2个字符计算
      return length >= 2 && length <= 20;
    },
    // 错误提示信息
    errorMessage: '姓名必须为2-20个字符（中文按2个字符计算）'
  },
  
  // 邮箱验证规则
  email: {
    // 验证函数：标准邮箱格式
    validate: function(value) {
      var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(value);
    },
    errorMessage: '请输入有效的邮箱地址（如：example@domain.com）'
  },
  
  // 电话验证规则
  phone: {
    // 验证函数：11位手机号，1开头
    validate: function(value) {
      var phoneRegex = /^1\d{10}$/;
      return phoneRegex.test(value);
    },
    errorMessage: '请输入有效的11位手机号码'
  },
  
  // 咨询类型验证规则
  type: {
    // 验证函数：必须选择非空值
    validate: function(value) {
      return value !== '' && value !== null;
    },
    errorMessage: '请选择咨询类型'
  }
};

/**
 * 初始化表单验证功能
 * 使用 jQuery 绑定事件处理程序
 */
function initFormValidation() {
  // ==================== jQuery 选择器缓存 ====================
  // 缓存 DOM 元素引用，避免重复查询
  var $form = $('#contact-form');           // 表单元素
  var $formMessage = $('#form-message');    // 提示信息区域
  var $nameInput = $('#contact-name');      // 姓名输入框
  var $emailInput = $('#contact-email');    // 邮箱输入框
  var $phoneInput = $('#contact-phone');    // 电话输入框
  var $typeSelect = $('#contact-type');     // 咨询类型下拉框
  var $messageTextarea = $('#contact-message'); // 留言文本域
  var $messageHint = $('#message-hint');    // 字数提示元素
  var $submitBtn = $('.btn--submit');       // 提交按钮
  
  // ==================== 验证状态跟踪对象 ====================
  // 记录每个字段的验证状态
  var validationState = {
    name: false,
    email: false,
    phone: false,
    type: false
  };
  
  /**
   * 显示错误提示
   * @param {jQuery} $input - 输入框 jQuery 对象
   * @param {string} message - 错误提示信息
   */
  function showError($input, message) {
    // 获取对应的错误提示元素
    var fieldName = $input.attr('name');
    var $errorEl = $('#' + fieldName + '-error');
    
    // 更新输入框样式为错误状态
    $input.removeClass('is-valid').addClass('is-invalid');
    
    // 显示错误提示（使用 jQuery 淡入动画）
    $errorEl.text(message).fadeIn(200);
    
    // 更新验证状态
    validationState[fieldName] = false;
  }
  
  /**
   * 显示验证通过状态
   * @param {jQuery} $input - 输入框 jQuery 对象
   */
  function showValid($input) {
    var fieldName = $input.attr('name');
    var $errorEl = $('#' + fieldName + '-error');
    
    // 更新输入框样式为通过状态
    $input.removeClass('is-invalid').addClass('is-valid');
    
    // 隐藏错误提示
    $errorEl.fadeOut(200);
    
    // 更新验证状态
    validationState[fieldName] = true;
  }
  
  /**
   * 清除验证状态
   * @param {jQuery} $input - 输入框 jQuery 对象
   */
  function clearValidation($input) {
    var fieldName = $input.attr('name');
    var $errorEl = $('#' + fieldName + '-error');
    
    $input.removeClass('is-valid is-invalid');
    $errorEl.fadeOut(200);
    
    if (validationState.hasOwnProperty(fieldName)) {
      validationState[fieldName] = false;
    }
  }
  
  /**
   * 验证单个字段
   * @param {jQuery} $input - 输入框 jQuery 对象
   * @returns {boolean} - 验证是否通过
   */
  function validateField($input) {
    var fieldName = $input.attr('name');
    var value = $.trim($input.val()); // 使用 jQuery 获取值并去除首尾空格
    var config = formValidationConfig[fieldName];
    
    // 如果没有配置验证规则，直接返回
    if (!config) return true;
    
    // 执行验证
    if (!value || !config.validate(value)) {
      showError($input, config.errorMessage);
      return false;
    } else {
      showValid($input);
      return true;
    }
  }
  
  /**
   * 验证整个表单
   * @returns {boolean} - 所有字段验证是否通过
   */
  function validateForm() {
    var isAllValid = true;
    
    // 依次验证每个字段
    if (!validateField($nameInput)) isAllValid = false;
    if (!validateField($emailInput)) isAllValid = false;
    if (!validateField($phoneInput)) isAllValid = false;
    if (!validateField($typeSelect)) isAllValid = false;
    
    return isAllValid;
  }
  
  /**
   * 显示表单级别的提示信息
   * @param {string} message - 提示信息
   * @param {string} type - 提示类型：'success' 或 'error'
   */
  function showFormMessage(message, type) {
    // 清除之前的类名
    $formMessage.removeClass('form-message--success form-message--error');
    
    // 添加新类名并显示
    if (type === 'success') {
      $formMessage
        .addClass('form-message--success')
        .html('<strong>✓ </strong>' + message)
        .fadeIn(300); // jQuery 淡入动画
    } else {
      $formMessage
        .addClass('form-message--error')
        .html('<strong>✗ </strong>' + message)
        .fadeIn(300);
    }
    
    // 成功提示3秒后自动淡出隐藏
    if (type === 'success') {
      setTimeout(function() {
        $formMessage.fadeOut(500);
      }, 3000);
    }
  }
  
  /**
   * 清除表单级别的提示信息
   */
  function hideFormMessage() {
    $formMessage.fadeOut(300).removeClass('form-message--success form-message--error');
  }
  
  // ==================== 事件绑定 ====================
  
  /**
   * 姓名输入框 - 实时验证
   * 事件：blur（失焦）、input（输入时清除错误状态）
   */
  $nameInput.on('blur', function() {
    validateField($(this));
  }).on('input', function() {
    // 输入时清除错误状态
    var value = $(this).val();
    if (value.length >= 2) {
      clearValidation($(this));
    }
  });
  
  /**
   * 邮箱输入框 - 实时验证
   */
  $emailInput.on('blur', function() {
    validateField($(this));
  }).on('input', function() {
    var value = $(this).val();
    // 简单的格式检查：包含 @ 符号
    if (value.indexOf('@') > -1 && value.indexOf('.') > -1) {
      clearValidation($(this));
    }
  });
  
  /**
   * 电话输入框 - 实时验证
   */
  $phoneInput.on('blur', function() {
    validateField($(this));
  }).on('input', function() {
    var value = $(this).val();
    // 输入时清除错误状态（当长度达到11位时）
    if (value.length === 11) {
      clearValidation($(this));
    }
  });
  
  /**
   * 咨询类型下拉框 - 验证
   */
  $typeSelect.on('change', function() {
    validateField($(this));
  });
  
  /**
   * 留言文本域 - 字数统计
   * 使用 jQuery 实时更新字数显示
   */
  $messageTextarea.on('input', function() {
    var currentLength = $(this).val().length;
    var maxLength = 200;
    
    // 更新字数提示
    $messageHint.text(currentLength + ' / ' + maxLength);
    
    // 字数接近上限时改变颜色提示
    if (currentLength >= maxLength) {
      $messageHint.css('color', '#ef4444');
    } else if (currentLength >= maxLength * 0.8) {
      $messageHint.css('color', '#f59e0b');
    } else {
      $messageHint.css('color', 'var(--muted)');
    }
  });
  
  /**
   * 表单提交处理
   * 使用 jQuery 阻止默认行为并执行验证
   */
  $form.on('submit', function(e) {
    // 阻止表单默认提交行为
    e.preventDefault();
    
    // 隐藏之前的提示信息
    hideFormMessage();
    
    // 执行全量表单验证
    if (validateForm()) {
      // 验证通过：显示成功提示
      showFormMessage('感谢您的咨询！我们的团队将在24小时内与您取得联系。', 'success');
      
      // 使用 jQuery 动画效果强调成功
      $submitBtn
        .text('提交成功 ✓')
        .addClass('btn--success')
        .prop('disabled', true);
      
      // 2秒后恢复按钮状态
      setTimeout(function() {
        $submitBtn
          .text('提交咨询')
          .removeClass('btn--success')
          .prop('disabled', false);
      }, 2000);
      
      // 可选：在这里添加实际的表单提交逻辑
      // 例如：$.ajax({ ... });
      
      console.log('表单验证通过，可以提交');
    } else {
      // 验证失败：滚动到第一个错误字段
      var $firstError = $form.find('.is-invalid').first();
      if ($firstError.length) {
        // 使用 jQuery 获取元素位置并平滑滚动
        $('html, body').animate({
          scrollTop: $firstError.offset().top - 100
        }, 400);
        
        // 聚焦到第一个错误字段
        $firstError.focus();
      }
      
      // 显示错误提示
      showFormMessage('请检查表单中的红色标记字段，确保所有必填项已正确填写。', 'error');
      
      console.log('表单验证失败');
    }
  });
  
  /**
   * 重置按钮点击处理
   * 清除所有验证状态和提示信息
   */
  $form.on('reset', function() {
    // 清除所有输入框的验证状态
    $form.find('.form-input, .form-select, .form-textarea')
      .removeClass('is-valid is-invalid');
    
    // 隐藏所有错误提示
    $form.find('.form-error').fadeOut(200);
    
    // 重置字数统计
    $messageHint.text('0 / 200').css('color', 'var(--muted)');
    
    // 隐藏表单级别提示
    hideFormMessage();
    
    // 重置验证状态
    validationState = {
      name: false,
      email: false,
      phone: false,
      type: false
    };
  });
  
  // ==================== 初始化完成日志 ====================
  console.log('✓ 表单验证模块初始化完成（jQuery v' + $.fn.jquery + '）');
}

// ==================== 回到顶部功能（jQuery 实现）====================

/**
 * 初始化"回到顶部"功能
 * 使用 jQuery 实现页脚 Logo 点击回到顶部的动画效果
 */
function initBackToTop() {
  // 缓存页脚 Logo 链接元素
  var $backToTop = $('.back-to-top');
  
  // 点击事件：平滑滚动到页面顶部
  $backToTop.on('click', function(e) {
    // 阻止默认的锚点跳转行为
    e.preventDefault();
    
    // 使用 jQuery 动画实现平滑滚动
    $('html, body').animate({
      scrollTop: 0
    }, 600, 'swing', function() {
      // 滚动完成后更新 URL 锚点
      history.pushState(null, null, '#top');
    });
    
    // 添加视觉反馈：轻微缩放效果
    $(this).find('img').animate({
      transform: 'scale(0.95)'
    }, 100).animate({
      transform: 'scale(1)'
    }, 100);
    
    console.log('✓ 回到顶部动画执行完成（jQuery）');
  });
}

// ==================== 模块初始化（DOM 加载完成后执行）====================

/**
 * 页面 DOM 加载完成后初始化所有 jQuery 功能
 * 确保 DOM 元素已就绪后再绑定事件
 */
$(document).ready(function() {
  // 初始化表单验证
  initFormValidation();
  
  // 初始化回到顶部功能
  initBackToTop();
  
  console.log('✓ 所有 jQuery 模块初始化完成');
});

// ==================== 暴露全局函数（供 main.js 调用）====================
window.initFormValidation = initFormValidation;
window.initBackToTop = initBackToTop;
