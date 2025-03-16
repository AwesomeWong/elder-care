package com.zzyl.service.impl;

import cn.hutool.core.collection.CollUtil;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zzyl.base.PageResponse;
import com.zzyl.dto.NursingProjectDto;
import com.zzyl.entity.NursingProject;
import com.zzyl.entity.NursingProjectPlan;
import com.zzyl.mapper.NursingProjectMapper;
import com.zzyl.mapper.NursingProjectPlanMapper;
import com.zzyl.service.NursingProjectService;
import com.zzyl.vo.NursingProjectVo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * 护理项目Service实现类
 */
@Service
public class  NursingProjectServiceImpl implements NursingProjectService {

    @Autowired
    private NursingProjectMapper nursingProjectMapper;

    @Autowired
    private NursingProjectPlanMapper nursingProjectPlanMapper;

    /**
     * 新增护理项目
     *
     * @param nursingProjectDTO 护理项目数据传输对象
     */
    @Override
    public void add(NursingProjectDto nursingProjectDTO) {
        NursingProject nursingProject = new NursingProject();
        BeanUtils.copyProperties(nursingProjectDTO, nursingProject);
        nursingProjectMapper.insert(nursingProject);
    }

    @Override
    public NursingProjectVo getById(Long id) {
        NursingProject nursingProject = nursingProjectMapper.selectById(id);
        NursingProjectVo nursingProjectVO = new NursingProjectVo();
        BeanUtils.copyProperties(nursingProject, nursingProjectVO);
        return nursingProjectVO;
    }

    @Override
    public PageResponse<NursingProjectVo> getByPage(String name, Integer status, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        Page<NursingProject> nursingProjects = nursingProjectMapper.selectByPage(name, status, pageNum, pageSize);
        PageResponse<NursingProjectVo> projectVoPageResponse = PageResponse.of(nursingProjects, NursingProjectVo.class);
        // 增加护理项目和计划的绑定关系
        List<Long> ids = nursingProjects.getResult()
                .stream()
                .map(NursingProject::getId)
                .distinct()
                .collect(Collectors.toList());

        if (CollUtil.isEmpty(ids)) {
            return projectVoPageResponse;
        }
        // 查询db
        List<NursingProjectPlan> projectPlanList = nursingProjectPlanMapper.listAllByProjectIds(ids);
        // 转为map
        Map<Long, List<NursingProjectPlan>> groupBy  = projectPlanList
                .stream()
                .collect(Collectors.groupingBy(NursingProjectPlan::getProjectId));
        // 设置绑定数量
        projectVoPageResponse.getRecords().forEach(v -> v.setCount(Optional.ofNullable(groupBy.get(v.getId())).orElse(new ArrayList<>()).size()));
        System.out.println(projectVoPageResponse);
        return projectVoPageResponse;
    }

    @Override
    public void update(NursingProjectDto nursingProjectDTO) {
        NursingProject nursingProject = new NursingProject();
        BeanUtils.copyProperties(nursingProjectDTO, nursingProject);
        nursingProjectMapper.update(nursingProject);
    }

    @Override
    public void deleteById(Long id) {
        nursingProjectMapper.deleteById(id);
    }

    @Override
    public void enableOrDisable(Long id, Integer status) {
        nursingProjectMapper.updateStatus(id, status);
    }

    @Override
    public List<NursingProjectVo> listAll() {
        return nursingProjectMapper.listAll();
    }
}
