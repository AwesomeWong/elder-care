package com.zzyl.vo;

import lombok.Data;

/**
 * @author itheima
 */
@Data
public class UserRoleVo {

    /**
     * 用户真名
     */
    private String userName;
    /**
     * 角色名称
     */
    private String roleName;

    /**
     * 用户id
     */
    private Long id;
}
