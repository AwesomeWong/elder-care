package com.zzyl.entity;

import com.zzyl.base.BaseEntity;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class DeviceData extends BaseEntity {

    /**
     * 接入位置
     */
    private String accessLocation;

    /**
     * 报警时间
     */
    private LocalDateTime alarmTime;

    /**
     * 数据值
     */
    private String dataValue;

    /**
     * 设备名称
     */
    private String deviceName;

    /**
     * 功能名称
     */
    private String functionName;

    /**
     * 设备ID
     */
    private String iotId;

    /**
     * 备注名称
     */
    private String noteName;

    /**
     * 处理结果
     */
    private String processingResult;

    /**
     * 处理时间
     */
    private LocalDateTime processingTime;

    /**
     * 处理人
     */
    private String processor;

    /**
     * 所属产品的key
     */
    private String productId;

    /**
     * 产品名称
     */
    private String productName;

    /**
     * 状态 0 正常 1 异常 2待处理 3已处理
     */
    private String status;

    public DeviceData() {
    }

    public DeviceData(String accessLocation, LocalDateTime alarmTime, String dataValue, String deviceName, String functionName, String iotId, String noteName, String processingResult, LocalDateTime processingTime, String processor, String productId, String productName, String status) {
        this.accessLocation = accessLocation;
        this.alarmTime = alarmTime;
        this.dataValue = dataValue;
        this.deviceName = deviceName;
        this.functionName = functionName;
        this.iotId = iotId;
        this.noteName = noteName;
        this.processingResult = processingResult;
        this.processingTime = processingTime;
        this.processor = processor;
        this.productId = productId;
        this.productName = productName;
        this.status = status;
    }
}