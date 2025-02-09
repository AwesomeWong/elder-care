package com.zzyl.controller;

import com.zzyl.base.PageResponse;
import com.zzyl.base.ResponseResult;
import com.zzyl.dto.NursingProjectDto;
import com.zzyl.service.NursingProjectService;
import com.zzyl.vo.NursingProjectVo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 护理项目Controller类
 */
@RestController
@RequestMapping("/nursing_project")
@Api(tags = "护理项目管理")
public class NursingProjectController {

    @Autowired
    private NursingProjectService nursingProjectService;

    /**
     * 新增护理项目
     *
     * @param nursingProjectDTO 护理项目数据传输对象
     * @return 操作结果
     */
    @PostMapping
    @ApiOperation("新增护理项目")
    public ResponseResult add(
            @ApiParam(value = "护理项目数据传输对象", required = true)
            @RequestBody NursingProjectDto nursingProjectDTO) {
        nursingProjectService.add(nursingProjectDTO);
        return ResponseResult.success();
    }

    /**
     * 根据编号查询护理项目信息
     *
     * @param id 护理项目编号
     * @return 护理项目信息
     */
    @GetMapping("/{id}")
    @ApiOperation("根据编号查询护理项目信息")
    public ResponseResult<NursingProjectVo> getById(
            @ApiParam(value = "护理项目编号", required = true)
            @PathVariable("id") Long id) {
        NursingProjectVo nursingProjectVO = nursingProjectService.getById(id);
        return ResponseResult.success(nursingProjectVO);
    }

    /**
     * 分页查询护理项目列表
     *
     * @param name     护理项目名称
     * @param status   状态：0-禁用，1-启用
     * @param pageNum  当前页码
     * @param pageSize 每页显示数量
     * @return 护理项目列表
     */
    @GetMapping
    @ApiOperation("分页查询护理项目列表")
    public ResponseResult<PageResponse<NursingProjectVo>> getByPage(
            @ApiParam(value = "护理项目名称")
            @RequestParam(value = "name", required = false) String name,
            @ApiParam(value = "状态：0-禁用，1-启用")
            @RequestParam(value = "status", required = false) Integer status,
            @ApiParam(value = "当前页码")
            @RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum,
            @ApiParam(value = "每页显示数量")
            @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize) {
        PageResponse<NursingProjectVo> nursingProjectPageInfo = nursingProjectService.getByPage(name, status, pageNum, pageSize);
        return ResponseResult.success(nursingProjectPageInfo);
    }

    /**
     * 更新护理项目信息
     *
     * @param nursingProjectDTO 护理项目数据传输对象
     * @return 操作结果
     */
    @PutMapping
    @ApiOperation("更新护理项目信息")
    public ResponseResult update(
            @ApiParam(value = "护理项目数据传输对象", required = true)
            @RequestBody NursingProjectDto nursingProjectDTO) {
        nursingProjectService.update(nursingProjectDTO);
        return ResponseResult.success();
    }

    /**
     * 删除护理项目信息
     *
     * @param id 护理项目编号
     * @return 操作结果
     */
    @DeleteMapping("/{id}")
    @ApiOperation("删除护理项目信息")
    public ResponseResult deleteById(
            @ApiParam(value = "护理项目编号", required = true)
            @PathVariable("id") Long id) {
        NursingProjectVo nursingProjectVO = nursingProjectService.getById(id);
        if (nursingProjectVO == null) {
            return ResponseResult.error();
        }
        nursingProjectService.deleteById(id);
        return ResponseResult.success();
    }

    @PutMapping("/{id}/status/{status}")
    @ApiOperation("启用/禁用护理项目")
    public ResponseResult enableOrDisable(
            @ApiParam(value = "护理项目编号", required = true)
            @PathVariable Long id,
            @ApiParam(value = "状态：0-禁用，1-启用", required = true)
            @PathVariable Integer status) {
        nursingProjectService.enableOrDisable(id, status);
        return ResponseResult.success();
    }

    @ApiOperation("查询所有护理项目")
    @GetMapping("/all")
    public ResponseResult<List<NursingProjectVo>> getAllNursingProject() {
        return ResponseResult.success(nursingProjectService.listAll());
    }
}
