package com.zzyl.vo;

import com.zzyl.entity.Applications;
import lombok.Data;

/**
 * @author shine
 */
@Data
public class ApplicationsVo extends Applications {

    /**
     * 单据流程状态
     */
    private Integer flowStatus;
}
