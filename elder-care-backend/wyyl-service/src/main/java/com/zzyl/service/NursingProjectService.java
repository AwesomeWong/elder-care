package com.zzyl.service;

import com.zzyl.base.PageResponse;
import com.zzyl.dto.NursingProjectDto;
import com.zzyl.vo.NursingProjectVo;

import java.util.List;

/**
 * 护理项目Service接口
 */
public interface NursingProjectService {

    /**
     * 新增护理项目
     *
     * @param nursingProjectDTO 护理项目数据传输对象
     */
    void add(NursingProjectDto nursingProjectDTO);

    /**
     * 根据编号查询护理项目信息
     *
     * @param id 护理项目编号
     * @return 护理项目信息
     */
    NursingProjectVo getById(Long id);

    /**
     * 分页查询护理项目列表
     *
     * @param name     护理项目名称
     * @param status   状态：0-禁用，1-启用
     * @param pageNum  当前页码
     * @param pageSize 每页显示数量
     * @return 护理项目列表
     */
    PageResponse<NursingProjectVo> getByPage(String name, Integer status, Integer pageNum, Integer pageSize);

    /**
     * 更新护理项目信息
     *
     * @param nursingProjectDTO 护理项目数据传输对象
     */
    void update(NursingProjectDto nursingProjectDTO);

    /**
     * 删除护理项目信息
     *
     * @param id 护理项目编号
     */
    void deleteById(Long id);

    /**
     * 启用或禁用
     * @param id ID
     * @param status 状态
     */
    void enableOrDisable(Long id, Integer status);

    /**
     * 查询所有护理项目
     * @return
     */
    List<NursingProjectVo> listAll();

}
