package kr.co.automl.domain.metadata.dataset;

import kr.co.automl.domain.metadata.BaseTimeEntity;
import kr.co.automl.domain.metadata.catalog.Catalog;
import kr.co.automl.domain.metadata.dataset.converter.TypeConverter;
import kr.co.automl.domain.metadata.dataset.dto.CreateDataSetAttributes;
import kr.co.automl.domain.metadata.distribution.Distribution;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED)
@Getter(AccessLevel.PACKAGE)
public class DataSet extends BaseTimeEntity {

    @Id
    @GeneratedValue
    @Column(name = "dataset_id")
    private long id;

    private String title;

    @Embedded
    private Organization organization;

    @Convert(converter = TypeConverter.class)
    private Type type;

    private String keyword;

    @Embedded
    private LicenseInfo licenseInfo;

    @Lob
    private String description;

    @OneToOne(fetch = LAZY, cascade = ALL)
    @JoinColumn(name = "catalog_id")
    private Catalog catalog;

    @OneToOne(fetch = LAZY, cascade = ALL)
    @JoinColumn(name = "distribution_id")
    private Distribution distribution;

    @Builder
    private DataSet(String title, Organization organization, Type type, String keyword, LicenseInfo licenseInfo, String description) {
        this.title = title;
        this.organization = organization;
        this.type = type;
        this.keyword = keyword;
        this.licenseInfo = licenseInfo;
        this.description = description;
    }

    public static DataSet from(CreateDataSetAttributes createDataSetAttributes) {
        return DataSet.builder()
                .title(createDataSetAttributes.title())
                .organization(Organization.of(
                        createDataSetAttributes.publisher(),
                        createDataSetAttributes.creator(),
                        createDataSetAttributes.contactPointName()
                ))
                .type(Type.ofName(createDataSetAttributes.typeName()))
                .keyword(createDataSetAttributes.keyword())
                .description(createDataSetAttributes.description())
                .licenseInfo(LicenseInfo.of(
                        createDataSetAttributes.license(), createDataSetAttributes.rights()
                ))
                .build();
    }

}